/**
 * @license
 *
 * MIT License
 *
 * Copyright (c) 2019 Richie Bendall
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * The main TMail class.
 * @class
 */
export class TMail {

    private _address: string

    /**
     * The main constructor.
     * @constructor
     */
    public constructor() {
        axios.get("https://10minutemail.com/10MinuteMail/resources/session/address")
            .then(res => this._address = res)
            .catch(err => throw err);
    }

    get address() {
        return this._address
    }

    public reset() {
        return new Promise((resolve, reject) => {
            axios.get("https://10minutemail.com/10MinuteMail/resources/session/reset")
                .then(() => {
                    axios.get("https://10minutemail.com/10MinuteMail/resources/session/address")
                        .then(res => {
                            this._address = res
                            resolve(this._address)
                        })
                        .catch(err => reject(err))
                })
                .catch(err => reject(err))
        })
    }

    public timeLeft() {
        return new Promise((resolve, reject) => {
            axios.get("https://10minutemail.com/10MinuteMail/resources/session/secondsLeft")
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }

    public timeExpires() {
        return new Promise((resolve, reject) => {
            axios.get("")
                .then(res => resolve(dayjs().add(res, 'second')))
                .catch(err => reject(err))
        })
    }

    public messages() {
        return new Promise((resolve, reject) => {
            axios.get("https://10minutemail.com/10MinuteMail/resources/messages")
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }

    public latestMessage(count = 1) {
        return new Promise((resolve, reject) => {
            axios.get(`https://10minutemail.com/10MinuteMail/resources/messages/messagesAfter/${count - 1}`)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
}
