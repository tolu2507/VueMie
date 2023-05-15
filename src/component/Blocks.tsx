/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {DATA} from './Error';
import {Twitter, twitter} from '../common/Twitter';
import Card from './Card';
import {Service} from './Dashboard';
import style from '../common/stlye';
import Icon from 'react-native-vector-icons/FontAwesome';
import {USER} from '../services/UserService';

const {
  outer,
  outerStyle,
  listStyle,
  dashboardView,
  innerDashboardView,
  innerDashboardViewTop,
  innerDashboardViewBottom,
  innerTop,
  innerTextTop,
  innerBottom,
  innerBottomIcon,
  innerBottomText,
  innerDashboardInner,
  innerDashboardInnerImage,
} = style.dashboard;

export function Top({one, headertext}: {one: {}; headertext: {}}) {
  return (
    <View style={[one]}>
      <Text style={[headertext]}>Error Page</Text>
    </View>
  );
}

export function Bottom({
  content,
  innercontent,
  contenttext,
  res,
  contentbuttonview,
  data,
  Button,
  key,
}: any) {
  return (
    <View style={[content]}>
      <View style={[innercontent]}>
        <Text style={[contenttext]}>{res}</Text>
      </View>
      <View style={[contentbuttonview]}>
        {data.map(({text, navigations, styles}: DATA) => {
          return (
            <View key={key}>
              <Button
                text={text}
                onPress={() => navigations.navigate(text)}
                style={[styles]}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}
interface DashboardContents {
  visuals: twitter[];
  services: Service[];
  outerStyleView?: {};
  outerView?: {};
  listStyleView?: {};
}

export function DashboardContent({
  visuals,
  services,
  outerView = outer,
  outerStyleView = outerStyle,
  listStyleView = listStyle,
}: DashboardContents) {
  return (
    <View style={outerView}>
      <View style={outerStyleView}>
        {visuals.map(({key, value}: twitter) => {
          return (
            <View key={key}>
              <Twitter value={value} />
            </View>
          );
        })}
      </View>

      <View style={listStyleView}>
        <FlatList data={services} renderItem={({item}) => <Card {...item} />} />
      </View>
    </View>
  );
}

export function DashboardContentTop({user}: {user: USER}) {
  return (
    <View style={[dashboardView]}>
      <View style={[innerDashboardView]}>
        <View style={[innerDashboardViewTop]}>
          <View style={[innerTop]}>
            <Text style={[innerTextTop]}>Be-nice</Text>
          </View>
          <View style={[innerBottom]}>
            <Text style={[innerBottomText]}>
              Welcome
              {user?.name.length >= 10
                ? user?.name.slice(0, 10) + '...'
                : user?.name}
            </Text>
            <View style={[innerBottomIcon]}>
              <Icon name={'star'} color={'black'} />
            </View>
          </View>
        </View>
        {/* divider */}
        <View style={[innerDashboardViewBottom]}>
          <View style={[innerDashboardInner]}>
            <Image
              source={{uri: user?.image}}
              resizeMode="cover"
              style={[innerDashboardInnerImage]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
