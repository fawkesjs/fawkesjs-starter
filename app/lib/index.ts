export class Template {
  static MAIN = 'template/main'
  static GUEST = 'template/guest'
  static page(page) {
    return {
      title: 'Site Title',
      page: '../view/' + page
    }
  }
}
