import { Animated, Easing } from "react-native";

export const showAnimationTopBottom = (show) => {
	const height = new Animated.Value(show ? 0 : 170);
	const fade = new Animated.Value(show ? 0 : 1);

	let animation = Animated.parallel([
		Animated.timing(height, {
			toValue: 0,
			easing: Easing.linear,
			duration: 300,
			delay: 0,
		}),
		Animated.timing(fade, {
			toValue: 0,
			easing: Easing.ease,
			duration: 300,
			delay: 0,
		}),
	]);

	if (show) {
		animation =  Animated.parallel([
			Animated.timing(height, {
				toValue: 170,
				easing: Easing.linear,
				duration: 300,
				delay: 0,
			}),
			Animated.timing(fade, {
				toValue: 60,
				easing: Easing.ease,
				duration: 300,
				delay: 0,
			}),
		])
	}

	return {height, animation, fade};
}
