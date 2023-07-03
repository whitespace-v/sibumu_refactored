import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import store, { persister } from "./PersistReduxConfiguration";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";


import ServicePage from './ServicePage'
import Iz_brasserie from "./Iz_brasserie";
import Main from "./MainPage"
import Contact from "./СontactsPage"
import Menu from "./MenuPage"
import Specials from "./SpecialsPage"
import Basket from "./BasketPage"
import Error from "./ErrorePage"
import Loading from "./Loading"
import Sibumi from "./sibumi"
import Konditory from "./konditory"
import About from "./about"
import ResultPage from "./ResultPage"
import ProductCard from './ProductCard';
import SpecialsCard from './SpecialCard';
import Delivery from './Delivery';

const RouterComponent = () => {
	return (
		<Provider store={store}><PersistGate loading={null} persistor={persister}>
			<Router>
				<Routes>
					{/* eslint-disable-next-line react/jsx-pascal-case */}
					<Route path="/iz-brasserie" element={<Iz_brasserie />} />,
					<Route path="/payment" element={<ServicePage />} />
					<Route path="/" element={<Main />} />
					<Route path="/contacts" element={<Contact />} />
					<Route path="/menu" element={<Menu />} />
					<Route path="/specials/:name" element={<Specials />} />
					<Route path="/izBrasserie" element={<Menu numberRestoran={1} />}/>
					<Route path="/Konditory" element={<Menu numberRestoran={3} />}/>
					<Route path="/Sibumii" element={<Menu numberRestoran={2} />}/>
					<Route path="/basket" element={<Basket />}/>
					<Route path="*" element={<Error />} />
					<Route path="/order/:id" element={<ResultPage />} />
					<Route path="/load" element={<Loading />} />
					<Route path="/sibumi" element={<Sibumi />} />
					<Route path="/konditoria" element={<Konditory />} />
					<Route path="/about" element={<About />} />
					<Route path="/menu/:id" element={<ProductCard />} />
					<Route path="/specials/card/:id" element={<SpecialsCard />} />
					<Route path="/delivery" element={<Delivery />} />
				</Routes>
			</Router>
		</PersistGate>
		</Provider>
	);
};

export default RouterComponent;
