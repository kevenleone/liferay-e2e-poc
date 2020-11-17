class Entry {
    public name: string;

    constructor (theName: string) {
      this.name = theName;
    }

    public test () {
      describe('Google', () => {
        it('Open Google', () => {
          cy.visit('https://google.com.br');
          cy.get('input.gLFyf.gsfi').type(this.name);
        });
      });
    }
}

new Entry('test').test();
