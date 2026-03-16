"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const cookieParser = require('cookie-parser');
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./shared/filters/http-exception.filter");
const response_interceptor_1 = require("./shared/interceptors/response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter());
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    app.enableCors();
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map