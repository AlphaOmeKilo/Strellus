import Vue from 'vue';

import { getAPI } from "@/stores/helpers/apiHelpers.js";

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
        setWorkspaces(state, payload) {
            state.workspaces = payload;
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
        async getWorkspaces({ commit }) {
            commit("clearWorkspaces");
            const workspaces = await getAPI("workspaces");
            commit("setWorkspaces", workspaces.data);
        },
        /**
         * Get the details of a workspace based on a given  workspace uuid
         * @param commit: The vuex commit object 
         * @param uuid: The uuid of the workspace
         */
        async getWorkspaceStack({ commit, rootStore }, { uuid }) {
            commit("setLoading", true, { root: true });
            const workspace = await getAPI("workspaces", uuid);
            commit("setActiveWorkspace", workspace.data.id);
            commit("setWorkspaceStack", workspace.data);
            commit("setLoading", false, { root: true });
        }
    }
}

export default WorkspaceStore;