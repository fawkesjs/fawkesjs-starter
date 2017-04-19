export class Template {
  public static MAIN = "template/main";
  public static GUEST = "template/guest";
  public static page(page) {
    return {
      page: "../view/" + page,
      title: "FawkesJs Starter",
    };
  }
}
