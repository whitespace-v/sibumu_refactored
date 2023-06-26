import React from 'react';
import { useState } from "react";
import LinksPool from "./Line_with_links";
import Page_With_Position from "./Page_With_Position";
import GenerateMass from "../Pages/functions/generateMass";
import noPicture from "../picture_izBrazzerie/noPic.jpg";
import { useEffect } from 'react';
import axios from 'axios';

const BlockForCanditoriya = ({ stateBlock, handleConditory, cardUrl, withoutCategories }) => {
	useEffect(() => {
		const fetchData = async () => {
			const data = await handleConditory()
			setListCanditoriya(data)
			setActive_linkElement(data[0].id)
		}
		fetchData()
	}, [])

	//наш массив, полученный из запроса
	const [listCanditoriya, setListCanditoriya] = useState([]);


	// Активная категория
	const [active_linkElement, setActive_linkElement] = useState("hot");

	const variants = () => {
		// BUG: Короче странная штука, но пришлось добавлять проверку на длину, потому что иначе падает при первой загрузке страницы
		if (withoutCategories && listCanditoriya.length) {
			return listCanditoriya[0]
		} else {
			return GenerateMass(listCanditoriya, active_linkElement)
		}
	}


	return (
		<div className={stateBlock ? "Canditoriya_main_block" : "Canditoriya_main_block_notActive"}>
			{!withoutCategories && <LinksPool active={active_linkElement} setActive={setActive_linkElement} list_map={listCanditoriya} />}
			<Page_With_Position variant_menu={variants()} page={'КОНДИТОРИЯ'} cardUrl={cardUrl} />
		</div>
	);
};

export default BlockForCanditoriya;
