import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, BackHandler } from 'react-native';
import { Text, List, Card, Layout, TopNavigation, Button, Icon, Modal } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';
import { Dropdown } from '../../Components/Dropdown';
import { products } from '../../Api/FakeApi';

export const ListProducts = ({ navigation }) => {

  const [cantidad, setCantidad] = useState(1);
  const [visibleModal, setVisibleModal] = useState(false);
  const [productsData, setProductsData] = useState();
  const [product, setProduct] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const shopIcon = (props) => (
    <Icon {...props} name='shopping-cart' />
  );

  const heartIcon = (props) => (
    <Icon {...props} name='heart-outline' />
  );

  const plusIcon = (props) => (
    <Icon {...props} name='plus-circle-outline' />
  );

  const minusIcon = (props) => (
    <Icon {...props} name='minus-circle-outline' />
  );

  useEffect(() => {
    setProductsData(products.products);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => { return true; };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const onCancelCart = () => {
    setCantidad(1);
    if (showAlert) setShowAlert(false);
    setVisibleModal(false);
  }

  const handlerAddToCart = () => {
    if (cantidad >= product.stock) {
      setShowAlert(true)
    } else {
      setCantidad(cantidad + 1)
    }
  }

  const handlerQuitToCart = () => {
    if (cantidad > 1) {
      if (showAlert) setShowAlert(false);
      setCantidad(cantidad - 1);
    }

  }

  const Header = (props) => (
    <View {...props}>
      <Text category='h6'>Agregar al Carrito </Text>
    </View>
  );
  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size='small'
        status='basic'
        onPress={onCancelCart}>
        Cancelar
      </Button>
      <Button
        style={styles.footerControl}
        size='small'
        status='primary'
        onPress={onCancelCart}>
        Agregar
      </Button>
    </View>
  );

  const renderItem = (info) => {

    return (
      <Card
        style={styles.item}
        onPress={() => navigation.navigate('DetailProduct', {
          productId: info.item.id,
        })}>
        <Layout style={styles.infoCard}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: info.item.image,
            }} />
          <Layout style={styles.cardData}>
            <Text category='h6'>{info.item.name}</Text>
            <Text category='s1'>$ {info.item.unit_price}</Text>
            <Text category='s1'>Cantidad: {info.item.stock}</Text>
            <Layout style={styles.infoCard}>
              <Button appearance='ghost' size='small' status='danger' accessoryLeft={heartIcon} />
              <Button appearance='ghost' size='small' status='primary' accessoryLeft={shopIcon}
                onPress={() => {
                  setProduct(info.item);
                  setVisibleModal(true);
                }} />
            </Layout>
          </Layout>
        </Layout>
      </Card>
    );
  };

  return (
    <Layout style={styles.container} level='1'>
      <TopNavigation
        alignment='center'
        title='Lista de Productos'
        accessoryRight={Dropdown}
      />
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={productsData}
        renderItem={renderItem}
      />
      <Modal
        visible={visibleModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisibleModal(true)}>
        <Card disabled={true} style={styles.card} header={Header} footer={Footer}>
          <Text category='s1'> {product.name} </Text>
          <Text category='s1'> $ {product.unit_price} </Text>
          {showAlert || product.stock === 0 ?
            <Text category='h6' status='danger'>
              No hay más {product.stock !== 0 ? 'de ' + product.stock : ''} articulos disponibles
            </Text>
            : <></>}
          {product.stock !== 0 ?
            <Layout style={styles.infoCard}>
              <Button appearance='ghost' size='small' status='danger' accessoryLeft={minusIcon}
                onPress={handlerQuitToCart} />
              <Text category='s1'>{cantidad} </Text>
              <Button appearance='ghost' size='small' status='danger' accessoryLeft={plusIcon}
                onPress={handlerAddToCart} />
            </Layout>
            : <></>}
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
  cardData: {
    marginLeft: 10
  },
  infoCard: {
    flexDirection: 'row',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    resizeMode: 'stretch'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    margin: 5,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopWidth: 3,
  },
});