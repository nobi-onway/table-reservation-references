import Grid from '@mui/material/Grid';

import styles from './ServiceForm.module.scss';
import classNames from 'classnames/bind';
import OutlinedButton from '../OutlinedButton';
import { useEffect, useState } from 'react';
import { getData, postData } from '../../../../services/apiService';
import {
    DISHES_URL,
    ORDER_DISHES_URL,
    ORDER_SERVICE_URL,
    SERVICES_URL,
} from '../../../../services/apiConstant';
import ServiceItem from '../ServiceItem';
import AddServiceItemButton from '../AddServiceItemButton';
import DishesItem from '../DishesItem';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const defaultServices = [
    {
        name: 'live music',
        price: 200,
    },
    {
        name: 'live music 2',
        price: 300,
    },
];

const defaultDishes = [
    {
        name: 'mushroom buger 1',
        price: 400,
    },
    {
        name: 'mushroom buger 2',
        price: 20,
    },
];

function ServiceForm({ handleCloseServiceForm, reservationId }) {
    const [dishesMenu, setDishesMenu] = useState(defaultDishes);
    const [serviceMenu, setServiceMenu] = useState(defaultServices);

    const [selectedDishes, setSelectedDishes] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    const handleRemoveItem = (item, setSelectedItems) => {
        setSelectedItems((preState) =>
            preState.filter((i) => i.name !== item.name),
        );
    };

    const handleAddItem = (item, items, setSelectedItems) => {
        let addedItem = items.find((i) => i.name === item.name);

        if (addedItem) {
            toast.warning('Item has already added!!!');
            return;
        }

        const newItem = { ...item, quantity: 1 };
        setSelectedItems((preState) => [...preState, newItem]);
    };

    const handleOrderDishes = () => {
        const dishes = selectedDishes.map((dish) => ({
            dishId: dish.dishId,
            quantity: dish.quantity,
        }));

        postData(`/${reservationId}${ORDER_DISHES_URL}`, dishes, (res) => {
            console.log(res);
            if (res) toast.success('Making order dishes successfully!');
        });
    };

    const handleOrderService = () => {
        const services = selectedServices.map((service) => service.serviceId);

        postData(`/${reservationId}${ORDER_SERVICE_URL}`, services, (res) => {
            console.log(res);
            if (res) toast.success('Making order services successfully!');
        });
    };

    const handleSubmitOrder = () => {
        handleOrderDishes();
        handleOrderService();
        handleCloseServiceForm();
    };

    useEffect(() => {
        getData(DISHES_URL, (dishes) => {
            const newDishes = dishes || defaultDishes;
            setDishesMenu(newDishes);
        });

        getData(SERVICES_URL, (services) => {
            const newServices = services || defaultServices;
            setServiceMenu(newServices);
        });
    }, []);

    return (
        <div className={`${cx('wrapper')}`}>
            <span className={`${cx('title')}`}>Dishes & Services</span>
            <form className={`${cx('form')}`}>
                <Grid container spacing={8}>
                    <Grid item sm={12} md={5}>
                        <div className={`${cx('sub-title')}`}>
                            <span>Food and Beverage</span>
                        </div>

                        <div className={`${cx('items-wrapper')}`}>
                            {selectedDishes.map((dish, index) => (
                                <DishesItem
                                    key={index}
                                    item={dish}
                                    handleRemoveItem={(item) =>
                                        handleRemoveItem(
                                            item,
                                            setSelectedDishes,
                                        )
                                    }
                                />
                            ))}
                        </div>

                        <AddServiceItemButton
                            label="Select food & beverage"
                            options={dishesMenu}
                            handleAddItem={(item) =>
                                handleAddItem(
                                    item,
                                    selectedDishes,
                                    setSelectedDishes,
                                )
                            }
                        />
                    </Grid>
                    <Grid item sm={12} md={5}>
                        <div className={`${cx('sub-title')}`}>
                            <span>Services</span>
                        </div>
                        <div className={`${cx('items-wrapper')}`}>
                            {selectedServices.map((service, index) => (
                                <ServiceItem
                                    key={index}
                                    item={service}
                                    handleRemoveItem={(item) =>
                                        handleRemoveItem(
                                            item,
                                            setSelectedServices,
                                        )
                                    }
                                />
                            ))}
                        </div>

                        <AddServiceItemButton
                            label="Select services"
                            options={serviceMenu}
                            handleAddItem={(item) =>
                                handleAddItem(
                                    item,
                                    selectedServices,
                                    setSelectedServices,
                                )
                            }
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <div className={`${cx('footer')}`}>
                            <OutlinedButton
                                style={{ margin: '0 1rem' }}
                                label="Order now"
                                onClick={handleSubmitOrder}
                            />
                            <OutlinedButton
                                onClick={handleCloseServiceForm}
                                label="Skip"
                            />
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default ServiceForm;
