import React from 'react';
import {
	ListItem, ListItemText, Icon, Collapse, List, Tooltip
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { BadgeGroup } from 'web/stories/component/home/Home';

class HomeMenu extends React.Component<{ open, items, onItemClick, presentation, favoriteItems }, { subItemOpen }> {

	constructor(props) {
		super(props)

		this.state = {
			subItemOpen: true
		}

		this.handleClick = this.handleClick.bind(this);
	}
	public handleClick() {
		const { subItemOpen } = this.state;

		this.setState({ subItemOpen: !subItemOpen })
	}

	public render() {
		const { open, items, onItemClick, presentation, favoriteItems } = this.props;
		const { subItemOpen } = this.state;

		const TooltipCustom = (props) => {
			if (!open) {
				return <Tooltip {...props} />
			}
			return props.children;
		}

		const arrItems = items.concat(favoriteItems.map((item, index) =>
			({
				id: (7 + index),
				idParent: "3",
				label: item.nmGroup,
				presentation: true,
				route: "/home/channels",
				state: { isPlaybook: true, filter: { arIdGroup: [item.idGroup] } },
				renderedIcon: <BadgeGroup nmGroup={item.nmGroup} />
			})
		))

		return (
			<List>
				{
					arrItems.filter(item => !item.idParent).map((item, index) => {
						const subItems = arrItems.filter(menuItem => menuItem.idParent === item.id);
						return (!presentation || item.presentation === presentation) && (
							<>
								<TooltipCustom title={item.label} placement={"right"}>
									<ListItem key={`${item.id}-${index}`} button={true} onClick={() => onItemClick(item)} id={`menu-${item.label}`}>
										{item.renderedIcon}
										<Icon>{item.icon}</Icon>
										<ListItemText primary={item.label} className="menu-label" />
										{subItems.length > 0 ? subItemOpen ? <ExpandLess onClick={this.handleClick} className="menu-label" /> : <ExpandMore onClick={this.handleClick} className="menu-label" /> : <></>}
									</ListItem>
								</TooltipCustom>
								<Collapse in={subItemOpen || !open} timeout="auto" unmountOnExit={true}>
									<List disablePadding={true} className="sub-item">
										{subItems.map(subitem => {
											return (!presentation || subitem.presentation === presentation) && (
												<TooltipCustom key={`${subitem.id}-${index}`} title={"Playbook da equipe " + subitem.label} placement={"right"}>
													<ListItem button={true} onClick={() => onItemClick(subitem)} id={`menu-${item.label}-${subitem.label}`}>
														{subitem.renderedIcon}
														{subitem.icon && <Icon >{subitem.icon}</Icon>}
														<ListItemText primary={subitem.label} className="menu-label" />
													</ListItem>
												</TooltipCustom>
											)
										})}
									</List>
								</Collapse>
							</>
						)
					})
				}
			</List>
		)
	}
}

export default HomeMenu;
