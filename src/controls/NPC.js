const Player = require('./Player');
const config = require('#/config');

class NPC extends Player {
    constructor(paintingId) {
        super();

        this.paintingId = paintingId;
    }

    onCreate() {
        super.onCreate();
    }

    intro() {
        config.axiosInstance.get(`/api/paintings/${this.paintingId}/introduction`)
            .then((resp) => {
                if (resp.status === 200) {
                    let response = resp.data;
                    if (response.result) {
                        console.log(response);
                        let len = response.instruction.length;
                        let i = 0;
                        setInterval(() => {
                            this.showBarrage(response.instruction[i].content, 4000);
                            i = ++i % len;
                        }, 5500);

                    } else this.showBarrage(response.message, 4000)
                } else this.showBarrage("我不知道说什么好", 4000);
            });
    }

    setPaintingId(paintingId) {
        this.paintingId = paintingId;
        this.intro();
    }
}

module.exports = NPC;