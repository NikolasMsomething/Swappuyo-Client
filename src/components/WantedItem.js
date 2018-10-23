import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./styles/WantList.css";
import { IoIosTrash } from "react-icons/io";
import { deleteWantTradeFromSwappuyoApi } from "../actions/index.js";

function WantedItem(props) {
	if (!props.authToken) {
		return <Redirect to="/login" />;
	}

	return (
		<React.Fragment>
			<ul className="wantListContainer">
				{props.wantListItems.map(item => {
					return (
						<React.Fragment>
							<li className="wantListItem" key={item.id}>
								<h2>{item.title}</h2>
								<h3>{item.author}</h3>
								<a href={item.url}>{item.url}</a>
								<button
									type="primary"
									className="delete-want-button"
									onClick={e => {
										e.preventDefault();
										console.log(item.id);
										props.dispatch(
											deleteWantTradeFromSwappuyoApi(props.authToken, item.id)
										);
									}}
								>
									<IoIosTrash />
								</button>
							</li>
						</React.Fragment>
					);
				})}
			</ul>
		</React.Fragment>
	);
}

function mapStateToProps(state) {
	console.log(state);
	return {
		wantListItems: state.wantListReducer.wantListItems,
		authToken: state.loginReducer.authToken
	};
}

export default connect(mapStateToProps)(WantedItem);
