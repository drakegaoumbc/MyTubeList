import { MyTubeListPage } from './app.po';

describe('my-tube-list App', () => {
  let page: MyTubeListPage;

  beforeEach(() => {
    page = new MyTubeListPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
