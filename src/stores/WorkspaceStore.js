import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Vue from 'vue';

const WorkspaceStore = {
    namespaced: true,
    state: {
        activeWorkspace: 0,
        workspaces: [],
        workspaceStack: {},
    },
    getters: {
        getWorkspaceNameById: state => id => {
            const filteredWorkspaces = state.workspaces.filter((workspace) => {
                return workspace.id === id
            });

            if(filteredWorkspaces[0]) {
                return filteredWorkspaces[0].name;
            }
        }
    },
    mutations: {
        addWorkspace(state, payload) {
            Vue.set(state.workspaces, state.workspaces.length, payload);
        },
        clearWorkspaces(state) {
            state.workspaces = [];
        },
        setWorkspaceStack(state, payload) {
            state.workspaceStack = payload;
        },
        setActiveWorkspace(state, payload) {
            state.activeWorkspace = payload;
        },
    },
    actions: {
        /**
         * Get the list of workspaces the user is part of
         * @param commit: The vuex commit object 
         */
        getWorkspaces({ commit }) {
            return new Promise((resolve, reject) => {
                commit("clearWorkspaces");
                firebase.firestore().collection('workspace_membership').where("user_id", "==", firebase.auth().currentUser.uid).get()
                .then(result => {
                    result.forEach(doc => {
                        firebase.firestore().collection('workspaces').doc(doc.data().workspace_id).get()
                        .then(result => {
                            const workspaceData = result.data();
    
                            commit("addWorkspace", {
                                id: result.id,
                                name: workspaceData.name,
                                new: doc.data().new,
                                admin: doc.data().admin,
                                private: doc.data().private
                            });
                            resolve();
                        })
                        .catch(error => {
                            reject();
                        });
                    })
                })
                .catch(error => {
                    reject();
                });
            });
        },
        /**
         * Get the details of a workspace based on a given  workspace uuid
         * @param commit: The vuex commit object 
         * @param uuid: The uuid of the workspace
         */
        getWorkspaceStack({ commit }, { uuid }) {

            firebase.firestore().collection('workspaces')
                .doc(uuid)
                .get()
                .then(result => {
                    const workspace = {
                        name: result.data().name
                    }
                    commit("setActiveWorkspace", result.id);
                    commit("setWorkspaceStack", workspace);
                })
                .catch(error => {

                });
        },
    }
}

export default WorkspaceStore;