/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { CookieController } from "./cookies.controller";

@Module({
    imports: [],
    controllers: [CookieController],
    providers: []
})
export class CookieModule {}