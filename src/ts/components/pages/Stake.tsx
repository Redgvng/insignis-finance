import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { INSIGNIS_DECIMALS } from '../../constant';

// @ts-ignore
import AnimatedNumber from "animated-number-react";
import Wallet from '../sub/Wallet';

export default function Stake() {
	const balance = useSelector((state: any) => state.web3.balance) / Math.pow(10, INSIGNIS_DECIMALS);
	const heartbeat = useSelector((state: any) => state.countdown.heartbeat);
	const rebase_timer = useSelector((state: any) => state.countdown.timer_rebase);

	/** function: show_balance {{{ */
	const show_balance = (): JSX.Element => {
		const content: JSX.Element = (
			<>
				<div className="amount">
					<AnimatedNumber
						value={balance}
						formatValue={(balance: number) => balance.toFixed(2)}
						duration={1000}
					/>
				</div>
				<div className="sub"><img src="./img/logo_coin_small.png" alt="coin" /> INSIG balance</div>

				<div className="timer">{rebase_timer}</div>
				<div className="sub">Next rebase</div>

				<div className="roi">1%</div>
				<div className="sub">Daily ROI</div>
			</>
		);

		return (
			<>
				<div className="balance-xl">
					<div className="d-none d-xl-block">
						{content}
					</div>
				</div>

				<div className="balance">
					<div className="d-block d-xl-none">
						{content}
					</div>
				</div>
			</>
		);
	};
	/** }}} */
	/** function: show_blockchain {{{ */
	const show_blockchain = (big: boolean): JSX.Element => {
		const content: JSX.Element = (
			<div className={big ? "insignis-coin-xl" : "insignis-coin"}>
				<motion.img className="coin" src="./img/logo.png" alt="Insignis Coin"
					variants={{
						pulse: {
							scale: [1, 1.2, 1],
							transition: {
								delay: 0,
							},
						},
					}}
					animate={heartbeat ? "pulse" : ""}
					transition={{
						duration: 5,
						ease: "backIn",
					}}
				/>

				{show_balance()}
			</div>
		);

		return (
			<>
				<div className="balance-xl">
					<div className="d-none d-xl-block">
						{content}
					</div>
				</div>

				<div className="balance">
					<div className="d-block d-xl-none">
						{content}
					</div>
				</div>
			</>
		);
	};
	/** }}} */

	return (
		<motion.div className="stake"
			exit={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
		>
			<div className="row">
				<div className="col-md-3"></div>
				<div className="col-12 col-md-7">
					<div className="d-none d-xl-block">
						{show_blockchain(true)}
					</div>

					<div className="d-block d-xl-none">
						{show_blockchain(false)}
					</div>
				</div>
				<div className="col-md-3"></div>
			</div>

			{/**
			<h2>Stake</h2>
			<b>Wallet:</b> {wallet}
			<br />
			<b>Balance:</b> {balance}
			<br />
			<b>Balance at next rebase:</b> {balance_next}
			<br />
			<b>Daily ROI:</b> 2%
			<br />
			<b>Epoch:</b> {epoch}
			<br />
			<b>Next rebase in:</b> {rebase_timer}  (not on schedule on the testnet)
	*/}

			<Wallet />
		</motion.div>
	);
}