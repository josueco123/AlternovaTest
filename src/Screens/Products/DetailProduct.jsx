import React, { useState, useEffect } from 'react';
import { Card, Text, Button, Layout, TopNavigation, Icon, Divider } from '@ui-kitten/components';
import { StyleSheet, Image, View } from 'react-native';
import { Dropdown } from '../../Components/Dropdown';
import { detailProducts } from '../../Api/FakeApi';

export const DetailProduct = ({ route, navigation }) => {

  const { productId } = route.params;
  const [cantidad, setCantidad] = useState(1);
  const [product, setProduct] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setProduct(detailProducts[productId - 1]);
  }, []);

  const plusIcon = (props) => (
    <Icon {...props} name='plus-circle-outline' />
  );

  const minusIcon = (props) => (
    <Icon {...props} name='minus-circle-outline' />
  );

  const Header = (props) => (
    <View {...props}>
      <Text category='h6'>{product.name}</Text>
      <Text category='s1'>Cantidad: {product.stock}</Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size='small'>
        Agregar
      </Button>
    </View>
  );

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

  return (
    <Layout style={styles.container} level='1'>
      <TopNavigation
        alignment='center'
        title='Producto'
        accessoryRight={Dropdown}
      />
      <Card style={styles.card} header={Header} footer={Footer}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: product.image,
          }} />
        <Text category='s1'>{product.description}</Text>
        <Divider />
        <Text category='h6' style={styles.price}>Precio: $ {product.unit_price}</Text>
        {product.stock !== 0 ?
          <Layout style={styles.infoCard}>
            <Button appearance='ghost' size='small' status='danger' accessoryLeft={minusIcon}
              onPress={handlerQuitToCart} />
            <Text category='s1'>{cantidad} </Text>
            <Button appearance='ghost' size='small' status='danger' accessoryLeft={plusIcon}
              onPress={handlerAddToCart} />
          </Layout>
          : <></>}
        {showAlert || product.stock === 0 ?
          <Text category='h6' status='danger'> No hay más {product.stock !== 0 ? 'de '+ product.stock : ''} articulos disponibles </Text>
          : <></>}
      </Card>
    </Layout>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 250,
    height: 250,
    resizeMode: 'stretch'
  },
  card: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  infoCard: {
    flexDirection: 'row',
    marginTop: 10
  },
  price: {
    marginTop: 10
  }
});