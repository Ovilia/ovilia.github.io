import Vue from 'vue';

export default Vue.component('status-signal', {
    template:
        `<div>
            <span id="system-status-signal">
                <span v-for="(signal, index) in signals"
                    class="signal"
                    v-bind:class="{ 'on': signal, ['signal-' + (index + 1)]: true }">
                </span>
            </span>
            <span id="system-status-connection">{{ connection }}</span>
        </div>`,

    data: function () {
        return {
            signals: [1, 1, 1, 0],
            connection: 'Wifi'
        };
    },

    created: function() {
        setInterval(() => {
            this.setSignals();
            this.setConnect();
        }, 5000);
    },

    methods: {
        setSignals: function () {
            const signalLength = 4;
            const cnt = Math.min(Math.floor(Math.random() * 10 + 1),
                signalLength);
            const signals = [1, 1, 1, 1];
            for (var i = 0; i < signalLength; ++i) {
                signals[i] = i < cnt ? 1 : 0;
            }
            this.signals = signals;
        },

        setConnect: function () {
            const connect = navigator.connection;
            if (!connect || connect.type === 'wifi') {
                this.connection = 'Wifi';
            }
            else {
                this.connection = connect.effectiveType.toUpperCase();
            }
        }
    }
});
