import React, { useState } from 'react';
import LinksPool from "../MenuPage/Line_with_links"
import Page_With_Position from "./Page_With_Position";
import GenerateMass from "../Pages/functions/generateMass";
import noPicture from "../picture_izBrazzerie/noPic.jpg";
import { useEffect } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {syncCategoryIndex} from "../Pages/ReducerRedux";

const BlockForIzBrasserie = ({ stateBlock, handleBrasserie, cardUrl, withoutCategories }) => {

	const dispatch = useDispatch()
	const syncedActive_linkElement = useSelector(state => state.categoryIndex)
	// Массив товаров
	const [listIzBrasserie, setIzBrasserie] = useState([]);

	// Активная категория
	const [active_linkElement, setActive_linkElement] = useState(syncedActive_linkElement);


	useEffect(() => {
		dispatch(syncCategoryIndex(active_linkElement))
	}, [active_linkElement])

	useEffect(() => {

		const fetchData = async () => {
			const data = await handleBrasserie()
			console.log(data)
			setIzBrasserie(data)
			if (!syncedActive_linkElement) {
				setActive_linkElement(data[0].id)
			}
		}
		fetchData()

	}, [])


	const variants = () => {
		// BUG: Короче странная штука, но пришлось добавлять проверку на длину, потому что иначе падает при первой загрузке страницы
		// -> потому что return listIzBrasserie[0] пытается достать нулевой элемент из пустого массива (при initialState в хуке useState), это не странно =)
		if (withoutCategories && listIzBrasserie.length) {
			return listIzBrasserie[0]
		} else {
			return GenerateMass(listIzBrasserie, active_linkElement)
		}
	}


	return (
		<div className={stateBlock ? "izBrasserie_main_block" : "izBrasserie_main_block_notActive"}>
			{!withoutCategories && <LinksPool active={active_linkElement} setActive={setActive_linkElement} list_map={listIzBrasserie} />}
			<Page_With_Position variant_menu={variants()} page={'IZ BRASSERIE'} cardUrl={cardUrl} />
		</div>
	);
};

export default BlockForIzBrasserie;
