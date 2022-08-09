export class Configurations {
  static config: Record<string, any> = { currentUserId: "", activeFriendId: "" };

  static setConfigData = function (data: any) {
    Configurations.config[data.key] = data.value;
  }
  static getConfigData = function (key: string) {
    return Configurations.config[key]
  }
}