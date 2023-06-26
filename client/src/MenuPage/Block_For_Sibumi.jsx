import React from 'react';
import LinksPool from "./Line_with_links";
import { useState } from "react";
import Page_With_Position from "./Page_With_Position";
import GenerateMass from "../Pages/functions/generateMass";
import noPicture from "../picture_izBrazzerie/noPic.jpg";
import { useEffect } from 'react';


const BlockForSibumi = ({ stateBlock, handleSibumi, cardUrl, withoutCategories }) => {
	// Запрос на получение каталога
	useEffect(() => {
		const fetchData = async () => {
			const data = await handleSibumi()
			setlSibumi(data)
			setActive_linkElement(data[0].id)
		}
		fetchData()
	}, [])

	// // Массив товаров
	const [listSibumi, setlSibumi] = useState([]);

	// Активная категория
	const [active_linkElement, setActive_linkElement] = useState();

	const variants = () => {
		// BUG: Короче странная штука, но пришлось добавлять проверку на длину, потому что иначе падает при первой загрузке страницы
		if (withoutCategories && listSibumi.length) {
			return listSibumi[0]
		} else {
			return GenerateMass(listSibumi, active_linkElement)
		}
	}

	return (
		<div className={stateBlock ? "Sibumi_main_block" : "Sibumi_main_block_notActive"}>
			{!withoutCategories && <LinksPool active={active_linkElement} setActive={setActive_linkElement} list_map={listSibumi} />}
			<Page_With_Position variant_menu={variants()} page={'SIBUMI'} cardUrl={cardUrl} />
		</div>
	);
};

export default BlockForSibumi;
