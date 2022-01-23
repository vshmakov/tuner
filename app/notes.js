class Notes {
    notes = {
        E2: 82.41,
        A2: 110,
        D3: 146.83,
        G3: 196,
        B3: 246.94,
        E4: 329.63,
    }
    lastUpdated = 0
    currentNoteFrequency = 0

    constructor(selector) {
        this.$root = document.querySelector(selector)
        this.$notesList = this.$root.querySelector('.notes-list')
        this.$frequency = this.$root.querySelector('.frequency')
        this.$noteFrequency = this.$root.querySelector('.note-frequency')
        this.$noteFrequencyDelta = this.$root.querySelector('.note-frequency-delta')
        Object.keys(this.notes).forEach(this.addNote.bind(this))
    }

    addNote(name, index) {
        const radio = htmlToElement(`<label><input type="radio" name="note" accesskey="${index + 1}">${name}</label>`)
        radio.addEventListener('click', () => {
            this.currentNoteFrequency = this.notes[name]
            this.$noteFrequency.innerText = this.currentNoteFrequency
        })
        this.$notesList.appendChild(radio)

        if (0 === index) {
            radio.click()
        }
    }

    update(note) {
        const time = new Date().getTime()
        const timeDelta = 1000
        const frequency = parseFloat(
            note.frequency
        ).toFixed(1)

        if (time - timeDelta <= this.lastUpdated || 50 < Math.abs(frequency - this.currentNoteFrequency)) {
            return
        }

        this.lastUpdated = time
        this.$frequency.childNodes[0].textContent = frequency
        const frequencyDelta = (frequency - this.currentNoteFrequency)
        const stringDelta = frequencyDelta.toFixed(1)
        this.$noteFrequencyDelta.innerText = frequencyDelta > 0 ? "+" + stringDelta : stringDelta
    }
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
