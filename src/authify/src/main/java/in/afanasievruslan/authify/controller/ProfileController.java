package in.afanasievruslan.authify.controller;

import in.afanasievruslan.authify.io.ProfileRequest;
import in.afanasievruslan.authify.io.ProfileResponse;
import in.afanasievruslan.authify.service.EmailService;
import in.afanasievruslan.authify.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final EmailService emailService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid @RequestBody ProfileRequest profileRequest){
        ProfileResponse profileResponse = profileService.createProfile(profileRequest);
        emailService.sendWelcomeEmail(profileResponse.getEmail(), profileResponse.getName());
        return profileResponse;
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile(@CurrentSecurityContext(expression = "authentication?.name") String email){
        return profileService.getProfile(email);
    }
}
