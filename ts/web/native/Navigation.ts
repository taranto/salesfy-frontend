import { push } from 'react-router-redux'
import { getStore } from 'app-core/boot/ConfigureStore';

class Navigation {

	public static navigate(options: any) {
		if(options){
			getStore().dispatch(push(`/${options.routeName.toLowerCase()}`))
		}

		return {type: '', ...options}
	}
}

export { Navigation as NavigationActions };
