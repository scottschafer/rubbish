import { RubbishPage } from './app.po';

describe('rubbish App', () => {
  let page: RubbishPage;

  beforeEach(() => {
    page = new RubbishPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
