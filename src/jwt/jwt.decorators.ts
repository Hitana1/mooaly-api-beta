import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const DecodedJwtAccessToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) {
        return request.user;
    }
    throw new UnauthorizedException();
});
