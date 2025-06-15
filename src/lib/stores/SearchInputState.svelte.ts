import { getContext, setContext } from 'svelte';

interface SearchbarInputState {
	value: string;
    update: (text: string) => void;
}

class SearchbarInputStateClass implements SearchbarInputState {
	value = $state("");
	update = (text: string) => {
		this.value = text
	};
}

const DEFAULT_KEY = '$_text_input_state';

export const getSearchbarInputState = (key = DEFAULT_KEY) => {
	return getContext<SearchbarInputState>(key);
};

export const setSearchbarInputState  = (key = DEFAULT_KEY) => {
	const searchbarState = new SearchbarInputStateClass();
	return setContext(key, searchbarState);
};