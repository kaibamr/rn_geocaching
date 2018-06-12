import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, List, Image } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { CardSection } from '../components/common';
import _ from 'lodash';

import { connect } from 'react-redux';
import { riddlesFetch, setCurrentRiddle } from '../actions/riddles_actions';

class RiddlesScreen extends Component {
	componentWillMount() {
        this.props.riddlesFetch();
	}

	_onPressItem = (id) => {
        this.setState((state) => {
          // copy the map rather than modifying state.
          //const selected = new Map(state.selected);
          selected.set(id, !selected.get(id));
          return {selected};
        });
      };
    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => (
        <CardSection style={styles.riddle}>
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            title={item.description}
		</CardSection>
    );

	getActive(item) {
        if (this.props.completedRiddles && this.props.completedRiddles.length > 0) {
            let completedRiddles = this.props.completedRiddles.split(",");

            if (_.includes(completedRiddles, item.id.toString())) {
                return <Button title="Completed!" buttonStyle={{backgroundColor: "#007c0c"}}></Button>;
            } else {
                if (this.props.currentRiddle == item.id) {
                    return <Button title="Active" buttonStyle={{backgroundColor: "#db3232"}}></Button>;
                } else {
                    return <Button onPress={()=>{ this.props.setCurrentRiddle(item.id) }} title="Select"></Button>;
                }
            }
        }
    }
	
	getStep(item) {
        if (this.props.completedRiddles && this.props.completedRiddles.length > 0) {
            let completedRiddles = this.props.completedRiddles.split(",");
            
            if (_.includes(completedRiddles, item.id.toString())) {
                //return <Text style={styles.completedText}> Completed!</Text>
                return <Text style={styles.completedText}> { item.parts }/{ item.parts } </Text>
            }
            else if (this.props.currentRiddle == item.id) {
                return <Text> { parseInt(this.props.currentStep) - 1 }/{ item.parts }</Text>
            }
            else {
                return <Text> 0/{ item.parts }</Text>
            }
        }
        else {
            //return <Text> 0/0 </Text>;
            return <Text> 0/{ item.parts } </Text>;
        }
    }

	render() {
		return (
			<View style={styles.viewStyle}>
				<FlatList
					data={this.props.riddlesMapped}
					renderItem={({item}) => {
						return (
						<Card title={item.description} key={item.id}>
							<Image source={{uri: item.thumbnailUrl}} style={{width: 300, height: 200}} />
							<Text style={styles.stepText}> Finished steps: {this.getStep(item)} </Text>
							{this.getActive(item)}
						</Card>
						);
					}}
					keyExtractor={(item, index) => `${item.id}`}   
				/>
			</View>
		);
	}
};

const styles = {
	viewStyle: {
		marginTop: 15
	},
	stepText: {
		marginTop: 10,
		marginBottom: 10,
		textAlign: 'center'
	}
}

const mapStateToProps = riddles => {
    const riddlesMapped = _.map(riddles.riddles.riddles, (val) => {
        return { ...val };
	});

    return {
        completedRiddles: riddles.riddles.completedRiddles,
        loading: riddles.riddles.loading,
        riddlesMapped,
        currentRiddle: riddles.riddles.currentRiddle,
        currentStep: riddles.riddles.currentStep
    };
};

export default connect(mapStateToProps, { riddlesFetch, setCurrentRiddle })(RiddlesScreen);