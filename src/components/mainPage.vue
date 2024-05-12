<template>
    <div>
        <div class="container">
            <div class="card">
                <div class="wrapper">
                    <h1>Things To Do: </h1>
                    <div class="row">
                        <input type="text" class="input-cari" placeholder="Search a task..." v-model="search">
                        <button class="btn-create" @click="popUp = true">Create</button>
                    </div>
                    <div class="card-task">
                        <div class="task" v-for="(i, no) in filtered" :key="no">
                            <p>{{ i.task }}</p>
                            <div class="btn-aksi">
                                <button @click="done(i)">Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-container" v-if="popUp">
            <div class="modal"
                :class="{ 'animate__animated animate__bounceIn': popUp, 'animate__animated animate__bounceOut': waitPopUpClose }">
                <form @submit.prevent="create">
                    <input type="text" class="form-modal" placeholder="Task..." v-model="input.task" required>
                    <button type="submit" class="btn-create">{{ buttontextDone }}</button>
                </form>
                <button class="btn-create" style="margin-top: 10px;" @click="popUpClose">Cancel</button>
            </div>
        </div>

    </div>
</template>

<script>
import 'animate.css'
import { db } from '@/firebase.js'
import { doc, addDoc, collection, Timestamp, onSnapshot, query, where, orderBy, updateDoc } from 'firebase/firestore'
export default {
    name: 'app',
    data() {
        return {
            waitPopUpClose: false,
            popUp: false,
            buttontextDone: 'Create',
            input: {
                email: JSON.parse(sessionStorage.getItem('loginData')).email,
                task: '',
                date: Timestamp.now().seconds,
                status: 'not_done'
            },
            taskData: [],
            search: '',
        }
    },
    mounted() {
        console.log(Timestamp.now().seconds)
        this.getTask()
    },
    computed: {
        filtered() {
            let filterData = this.taskData
            filterData = filterData.filter(i => i.status == "not_done")
            if (this.search) {
                filterData = filterData.filter(i => i.task.toLowerCase().toString().includes(this.search.toLowerCase()))
            }
            return filterData
        }
    },
    methods: {
        popUpClose() {
            this.waitPopUpClose = true
            setTimeout(() => {
                this.popUp = false
                this.waitPopUpClose = false
            }, 1300)
        },
        async create() {
            try {
                console.log('sedang mengirim')
                this.buttontextDone = "Tunggu..."
                this.popUpClose()
                await addDoc(collection(db, 'task'), this.input)
                this.buttontextDone = "Oke..."
                console.log('sukses mengirim')
                this.buttontextDone = "Create"
            } catch (error) {
                console.log(error)
            }
        },
        async getTask() {
            try {
                await onSnapshot(query(collection(db, 'task'),
                    where('email', '==', this.input.email),
                    orderBy('date', 'asc')), (snapshot) => {
                        this.taskData = []
                        snapshot.forEach((taskData) => {
                            const data = taskData.data()
                            this.taskData.push({ ...data, id: taskData.id })
                            console.log({ ...data })
                        })
                    })


                // get.forEach((taskData) => {
                //     const data = taskData.data()
                //     this.taskData.push({ ...data, id: taskData.id })
                //     console.log({ ...data })
                // })
            } catch (error) {
                console.log(error)
            }
        },
        async done(i) {
            try {
                console.log({ idTask: i.id })
                await updateDoc(doc(db, 'task', i.id), {
                    status: 'done'
                })
                console.log('terhapus')
                this.taskData.filter(i => i.id != i.id)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
.container {
    border: 1px solid black;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    border: 3px solid black;
    width: 80%;
    height: 90vh;
    border-radius: 15px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper {
    /* border: 1px solid red; */
    width: 85%;
    height: 95%;
}

.row {
    display: flex;
    width: 100%;
    margin-top: 20px;
}

.input-cari {
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px;
    width: 50%;
    margin-right: 20px;
}

.btn-create {
    border: 2px solid black;
    padding: 10px 30px;
    border-radius: 5px;
    font-weight: bolder;
    cursor: pointer;
}

.card-task {
    height: 85%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}

.card-task::-webkit-scrollbar {
    width: 10px;
}

.card-task::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.card-task::-webkit-scrollbar-thumb {
    background: #888;
}

.card-task::-webkit-scrollbar-thumb:hover {
    background: #00000000;
}


.task {
    border: 2px solid black;
    border-radius: 5px;
    margin-top: 20px;
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task p {
    margin-left: 10px;
    font-size: 1.2rem;
}

.task .btn-aksi {
    margin-right: 10px;
}

.task .btn-aksi button {
    padding: 10px 20px;
    border: 2px solid black;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
}

.modal-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    border: 2px solid black;
    width: 320px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 9999;
}

.form-modal {
    padding: 10px;
    border: 2px solid black;
    border-radius: 5px;
    width: 50%;
    margin-right: 10px
}
</style>