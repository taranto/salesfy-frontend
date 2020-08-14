import { ILocation } from 'app-core/utils/interfaces/index';
import ScreenLocation from './ScreenLocation';

abstract class FormScreenLocation<P={}, S={}> extends ScreenLocation<P & ILocation, S> {

	constructor(props){
		super(props);

		this.onValueChange = this.onValueChange.bind(this);
	}

	public abstract onValueChange();
}

export default FormScreenLocation;
