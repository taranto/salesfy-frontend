class RoutesAppEnum {
	public static root = { route: "/" };
	public static login = { route: "/login" };
	public static home = { route: "/home" };
	public static groups = { route: "/home/groups" };
	public static channels = { route: "/home/channels" };
	public static channelDetails = { route: "/home/channels/details" };
	public static channelContent = { route: "/home/channels/content"}
	public static content = { route: "/content" }

	public static loaderError = { route: "/loaderError" };

	public static contentDetails = { route: "/home/content/details"}
}

export default RoutesAppEnum;
