import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleService implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<string[]>('roles', context.getHandler())
        if (!requiredRole) {
            return true
        }
        const req = context.switchToHttp().getRequest()
        const userRoles = req['role']
        if (!userRoles || !requiredRole.includes(userRoles)) {
            throw new BadRequestException("you don't have permission")
        }
        return true
    }
}