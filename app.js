var app = new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        turns: [],
    },
    methods: {
        startGame() {
            this.isGameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack() {
            var damageMonster = this.calculateDamage(3, 10);
            this.monsterHealth -= damageMonster
            this.turns.unshift({
                isPlayer: true,
                text: "Player damaged Monster by " + damageMonster
            })
            if (this.checkWin()) {
                return
            }
            var damagePlayer = this.calculateDamage(3, 10)
            this.playerHealth -= damagePlayer
            this.turns.unshift({
                isPlayer: false,
                text: "Monster damaged Player by " + damagePlayer
            })
            this.checkWin()

        },
        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        specialAttack() {
            var damageMonster = this.calculateSpecialDamage(10, 20)
            this.monsterHealth -= damageMonster
            this.turns.unshift({
                isPlayer: true,
                text: "Player damaged Monster HARD! by " + damageMonster
            })
            if (this.checkWin()) {
                return
            }
            var damagePlayer = this.calculateSpecialDamage(10, 20)
            this.playerHealth -= damagePlayer
            this.turns.unshift({
                isPlayer: false,
                text: "Monster damaged Player HARD! by " + damagePlayer
            })
            this.checkWin()

        },
        calculateSpecialDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)

        },
        heal() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
                this.turns.unshift({
                    isPlayer: true,
                    text: "Player healed by 10"
                })

            } else {
                this.playerHealth = 100
                this.turns.unshift({
                    isPlayer: false,
                    text: "Player healed by 10"
                })

            }
            var damagePlayer = this.calculateDamage(3, 10)
            this.playerHealth -= damagePlayer
            this.turns.unshift({
                isPlayer: false,
                text: "Monster damaged Player  by " + damagePlayer
            })
            this.checkWin()

        },
        // calculateHealth(min) {
        //     return Math.max(Math.floor(Math.random() * min) + 1)
        // },
        giveUp() {
            alert("YOU GAVE UP !!")
            this.isGameRunning = false
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },
        checkWin() {
            if (this.monsterHealth <= 0) {
                if (confirm('YOU WON!: START A NEW GAME?')) {
                    this.turns = []

                    this.startGame()
                } else {
                    this.turns = []

                    this.isGameRunning = false


                }
                return true
            } else if (this.playerHealth <= 0) {
                if (confirm('YOU LOST!: START A NEW GAME?')) {
                    this.turns = []

                    this.startGame()
                } else {
                    this.turns = []

                    this.isGameRunning = false
                }
                return true
            }
            return false

        },
    },
})