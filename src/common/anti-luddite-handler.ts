import log from 'loglevel';

export default class AntiLudditeHandler {
    public static init() {
        AntiLudditeHandler.setLogLevel();
    }

    private static setLogLevel() {
        log.setLevel(log.levels.INFO);
    }
}
