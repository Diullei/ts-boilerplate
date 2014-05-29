/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="_reference.ts" />

module Main {
    export class HelloWorld {
        private element: JQuery;
        private timerToken: number;
        private stopped: boolean;

        constructor(content: JQuery, btn: JQuery) {
            this.stopped = true;
            this.element = content;
            this.bindClick(btn);
        }

        private bindClick(btn: JQuery) {
            btn.click(() => {
                if (this.isStopped()) {
                    btn.text(' Stop')
                        .prepend('<span class="glyphicon glyphicon-stop"></span>')
                        .removeClass("btn-success")
                        .addClass("btn-primary");
                    this.start();
                } else {
                    btn.text(' Start')
                        .prepend('<span class="glyphicon glyphicon-play"></span>')
                        .removeClass("btn-primary")
                        .addClass("btn-success");
                    this.stop();
                }
            });
        }

        public isStopped() {
            return this.stopped;
        }

        public start() {
            this.element.html("starting...");
            this.timerToken = setInterval(() => this.element.html("The time is: " + (new Date().toUTCString())), 500);
            this.stopped = false;
        }

        public stop() {
            clearTimeout(this.timerToken);
            this.stopped = true;
        }
    }

    //
    // example of exported functions
    //
    export function greeter() {
        return 'Hello world!';
    }

    export function sum(a: number, b: number) {
        return a + b;
    }
}
