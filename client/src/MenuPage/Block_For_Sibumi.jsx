import React from 'react';
import LinksPool from "./Line_with_links";
import { useState } from "react";
import Page_With_Position from "./Page_With_Position";
import GenerateMass from "../Pages/functions/generateMass";
import noPicture from "../picture_izBrazzerie/noPic.jpg";
import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {syncCategoryIndex} from "../Pages/ReducerRedux";


const BlockForSibumi = ({ stateBlock, handleSibumi, cardUrl, withoutCategories }) => {
	const dispatch = useDispatch()
	const syncedActive_linkElement = useSelector(state => state.categoryIndex)
	const [active_linkElement, setActive_linkElement] = useState(syncedActive_linkElement);

	useEffect(() => {
		dispatch(syncCategoryIndex(active_linkElement))
	}, [active_linkElement])

	// Запрос на получение каталога
	useEffect(() => {
		const fetchData = async () => {
			const data = await handleSibumi()
			setlSibumi(data)
			if (data.find(o => o.id === syncedActive_linkElement)) {
				setActive_linkElement(syncedActive_linkElement)
			} else {
				setActive_linkElement(data[0].id)
			}
		}
		fetchData()
	}, [])

	// // Массив товаров
	const [listSibumi, setlSibumi] = useState([]);

	// Активная категория


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
