package in.afanasievruslan.authify.service;

import in.afanasievruslan.authify.entity.UserEntity;
import in.afanasievruslan.authify.io.ProfileRequest;
import in.afanasievruslan.authify.io.ProfileResponse;
import in.afanasievruslan.authify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class ProfileServiceImp implements ProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    public ProfileResponse createProfile(ProfileRequest request) {
        UserEntity newProfile = convertToUserEntity(request);
        if (!userRepository.existsByEmail(request.getEmail())) {
            newProfile = userRepository.save(newProfile);
            return convertToProfileResponse(newProfile);
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Profile already exists");
    }

    @Override
    public ProfileResponse getProfile(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));
        return convertToProfileResponse(existingUser);
    }

    @Override
    public void sendResetOtp(String email) {
        UserEntity existingEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));

        //Generate 6 digit otp
        String otp = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));

        //Calculate expiry time (current time + 15 minutes in milliseconds)
        long expiryTime = System.currentTimeMillis() + (15 * 60 * 1000);

        //Update the profile/user
        existingEntity.setResetOtp(otp);
        existingEntity.setResetOtpExpireAt(expiryTime);

        //Save into database
        userRepository.save(existingEntity);

        try {
            emailService.sendResetOtpEmail(existingEntity.getEmail(), otp);
        } catch (Exception e) {
            throw new RuntimeException("Unable to send email");
        }
    }

    @Override
    public void resetPassword(String email, String otp, String newPassword) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));

        if (existingUser.getResetOtp() == null || !existingUser.getResetOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }
        if (existingUser.getResetOtpExpireAt() < System.currentTimeMillis()) {
            throw new RuntimeException("OTP expired");
        }
        existingUser.setPassword(passwordEncoder.encode(newPassword));
        existingUser.setResetOtp(null);
        existingUser.setResetOtpExpireAt(0L);

        userRepository.save(existingUser);
    }

    @Override
    public void sendOtp(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found" + email));
        if (existingUser.getIsAccountVerified() != null && existingUser.getIsAccountVerified()) {
            return;
        }

        //Generate 6 digit otp
        String otp = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));

        //Calculate expiry time (current time + 24 hours in milliseconds)
        long expiryTime = System.currentTimeMillis() + (24 * 60 * 60 * 1000);

        //Update the user entity
        existingUser.setVerifyOtp(otp);
        existingUser.setVerifyOtpExpireAt(expiryTime);

        userRepository.save(existingUser);

        try {
            emailService.sendOtpEmail(existingUser.getEmail(), otp);
        } catch (Exception e) {
            throw new RuntimeException("Unable to send email");
        }
    }

    @Override
    public void verifyOtp(String email, String otp) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found: " + email));

        if (existingUser.getVerifyOtp() == null || !existingUser.getVerifyOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }
        if (existingUser.getVerifyOtpExpireAt() < System.currentTimeMillis()) {
            throw new RuntimeException("OTP expired");
        }
        existingUser.setIsAccountVerified(true);
        existingUser.setVerifyOtp(null);
        existingUser.setVerifyOtpExpireAt(0L);

        userRepository.save(existingUser);
    }

    private ProfileResponse convertToProfileResponse(UserEntity newProfile) {
        return ProfileResponse.builder()
                .name(newProfile.getName())
                .email(newProfile.getEmail())
                .userId(newProfile.getUserId())
                .isAccountVerified(newProfile.getIsAccountVerified())
                .build();
    }

    private UserEntity convertToUserEntity(ProfileRequest request) {
        return UserEntity.builder()
                .email(request.getEmail())
                .name(request.getName())
                .userId(UUID.randomUUID().toString())
                .password(passwordEncoder.encode(request.getPassword()) )
                .isAccountVerified(false)
                .resetOtpExpireAt(0)
                .verifyOtp(null)
                .verifyOtpExpireAt(0)
                .build();
    }
}
