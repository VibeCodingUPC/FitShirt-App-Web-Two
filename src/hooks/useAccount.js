import { reactive, watch } from 'vue';

const defaultUserId = '1';

const storedUserId = localStorage.getItem('userId') || defaultUserId;

const userId = reactive({ id: storedUserId });

watch(
    () => userId.id,
    (newId) => {
        localStorage.setItem('userId', newId);
    }
);

const saveUserId = (id) => {
    userId.id = id;
    localStorage.setItem('userId', id);
};

export const useAccount = () => {
    return {
        userId,
        saveUserId,
    };
};