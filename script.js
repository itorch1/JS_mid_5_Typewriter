class TypeWriter{
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.wait = wait;

        this.type();
    }
    txt = '';
    wordIndex = 0;
    isDeleting = false;

    type() {
        // let index = this.wordIndex % this.words.length;
        let index = this.wordIndex;

        if (!this.isDeleting)
            this.txt = this.words[index].substring(0,this.txt.length + 1);
        else
            this.txt = this.words[index].substring(0,this.txt.length - 1);

        this.txtElement.innerText = this.txt;

        // Type speed
        let typeSpeed = 300;

        if (this.isDeleting)
            typeSpeed /= 3;

        if (this.txt === this.words[index]) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        }

        if (this.txt === '') {
            this.isDeleting = false;
            this.wordIndex ++;
            if (this.wordIndex === this.words.length)
                this.wordIndex = 0;
            typeSpeed = 500;
        }

        setTimeout( () => {
            this.type();
        }, typeSpeed );

    }
}

document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait);

}