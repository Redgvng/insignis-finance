import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from 'web3';
import { useSelector, useDispatch } from 'react-redux';
import store from '../redux/store';
import { update_web3 } from '../redux/slice_web3';

export default function Header() {
	/** function: connect_wallet_click {{{ */
	const connect_wallet_click = async (): Promise<void> => {
		const state = store.getState();
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider,
				options: {
					infuraId: "INFURA_ID"
				}
			}
		};
		const web3Modal = new Web3Modal({
			cacheProvider: false,
			providerOptions,
			theme: "dark"
		});

		web3Modal.clearCachedProvider();

		const provider = await web3Modal.connect();

		store.dispatch(() => update_web3(provider)); // updates web3 state
	};
	/** }}} */
	/** function: connect_wallet_button {{{ */
	const connect_wallet_button = (): JSX.Element => {
		const wallet = useSelector((state: any) => state.web3.wallet);

		if (wallet) {
			return (<button className="btn btn-success wallet-connect">Connected</button>);
		}

		else {
			return (<button className="btn btn-warning wallet-connect" onClick={() => connect_wallet_click()}>Connect wallet</button>);
		}
	};
	/** }}} */

	return (
		<header>
			<nav>
				<h1>
					<Link to="/" className="home-link" title="Home">Insignis Finance - testnet</Link>
				</h1>
				<li><NavLink to="/stake" className="nav-item" activeClassName="nav-item active">Stake</NavLink></li>
				<li><NavLink to="/vault" className="nav-item" activeClassName="nav-item active">Vault</NavLink></li>
				<li><a className="nav-item" href="https://www.google.com" target="_blank">Documentation</a></li>
				<li><a className="nav-item" href="https://dexscreener.com/harmony" target="_blank">Chart</a></li>
				<div className="connect">
					{connect_wallet_button()}
				</div>
			</nav>
		</header>
	);
}