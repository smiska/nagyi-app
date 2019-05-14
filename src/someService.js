import someutil from './utils/someutil'

class ErrorService {
    constructor() {
        this.errorBox = document.getElementById('errMsg')
    alert('ErrorService')

    }

    handleError() {
        if (someutil) {

            const errMsg = 'This is a errror...'

            this.errorBox.classList.toggle('visible')
            this.errorBox.innerText = errMsg
        }
    }
}

export default new ErrorService()