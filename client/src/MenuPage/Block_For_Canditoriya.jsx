import React from 'react';
import { useState } from "react";
import LinksPool from "./Line_with_links";
import Page_With_Position from "./Page_With_Position";
import GenerateMass from "../Pages/functions/generateMass";
import noPicture from "../picture_izBrazzerie/noPic.jpg";
import { useEffect } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {syncCategoryIndex} from "../Pages/ReducerRedux";

const BlockForCanditoriya = ({ stateBlock, handleConditory, cardUrl, withoutCategories }) => {

	const syncedActive_linkElement = useSelector(state => state.categoryIndex)
	const [active_linkElement, setActive_linkElement] = useState(syncedActive_linkElement);
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(syncCategoryIndex(active_linkElement))
	}, [active_linkElement])


	useEffect(() => {
		const fetchData = async () => {
			const data = await handleConditory()
			setListCanditoriya(data)
			if (data.find(o => o.id === syncedActive_linkElement)) {
				setActive_linkElement(syncedActive_linkElement)
			} else {
				setActive_linkElement(data[0].id)
			}
		}
		fetchData()
	}, [])

	//наш массив, полученный из запроса
	const [listCanditoriya, setListCanditoriya] = useState([]);


	// Активная категория


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
