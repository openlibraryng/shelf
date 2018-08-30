import {DatabaseService} from "~/modules/core/services/database.service";
import {AuthService} from "~/modules/core/services/auth.service";
import {LogService} from "~/modules/core/services/log.service";

export const CORE_SERVICES = [
    DatabaseService,
    AuthService,
    LogService,
];

export * from './database.service'
export * from './auth.service'
export * from './log.service'