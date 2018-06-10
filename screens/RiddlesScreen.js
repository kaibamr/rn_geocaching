import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, List } from 'react-native';
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
          selected.set(id, !selected.get(id)); // toggle
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
        //if (this.props.completed && this.props.completed.length > 0) {
            //let completed = this.props.completed.split(",");
            
            //if (_.includes(completed, item.id.toString())) {
              //  return null;
            //}
            if (this.props.currentRiddle == item.id) {
                return <Button title="Active" backgroundColor="white" color="black"></Button>;
            }
            else {
                return <Button onPress={()=>{ this.props.setCurrentRiddle(item.id) }} title="Select"></Button>;
            }
        //}
        //else {
        //    return <Button onPress={()=>{ this.props.setCurrentRiddle(item.id) }} title="Select"></Button>;
        //}
    }
	
	getStep(item) {
        if (this.props.completed && this.props.completed.length > 0) {
            let completed = this.props.completed.split(",");
            console.log(completed);
            
            if (_.includes(completed, item.id.toString())) {
                return <Text style={styles.completedText}> Completed!</Text>
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
						<CardSection style={styles.riddle}>
							<View style={styles.info}>
								<Text style={styles.titleStyle}>{ item.description }</Text>

								<View style={styles.partStyle}>
									{ this.getStep(item)  } 
								</View>
							</View>
							<View style={styles.check}>
								{ this.getActive(item) }
							</View>
						</CardSection>
						);
					}
					}   
				/>
			</View>
		);
	}
};

const styles = {
    viewStyle: {
        display: 'flex', 
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
		flexDirection: 'column',
		marginTop: 15,
		marginBottom: 15
    },
    riddle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
        marginBottom: 5,
        flex: 1
    },
    check: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    info: {
        display: 'flex'
    },
    active: {
        color: '#ccc'
    },
    progress: {
        flex: 1
    },
    titleStyle: {
        fontSize: 18,
        paddingLeft: 5
    },
    partStyle: {
        paddingLeft: 5
    },
    completedText: {
        fontWeight: 'bold',
        color: 'green'
    }
}

// function mapStateToProps({ riddles }) {
// 	// if (state.riddles && state.riddles.riddles) {
// 	// 	const riddlesMapped = _.map(state.riddles.riddles, (val) => {
// 	// 		return { ...val };
// 	// 	});
// 	// } else {
// 	// 	riddlesMapped = [];
// 	// }
// 	console.log("RIDDLES");
// 	console.log(riddles);
// 	// console.log(state.currentRiddle);
// 	// console.log(state.currentStep);

//     return {
//         // longitude: state.geo.longitude,
//         // latitude: state.geo.latitude,
//         // completed: state.riddles.completed,
//         // loading: state.riddles.loading,
//         // //riddles: state.riddles.riddles,
//         // riddlesMapped,
//         // currentRiddle: state.riddles.currentRiddle,
// 		// currentStep: state.riddles.currentStep
// 		riddles: riddles.riddles,
// 		// currentRiddle: {},
// 		// currentStep: {},
// 		// completed: {},
// 		// loading: false
//     };
// }

const mapStateToProps = riddles => {
    const riddlesMapped = _.map(riddles.riddles.riddles, (val) => {
        return { ...val };
	});

    return {
        completed: riddles.riddles.completed,
        loading: riddles.riddles.loading,
        // riddles: state.riddles.riddles
        riddlesMapped,
        currentRiddle: riddles.riddles.currentRiddle,
        currentStep: riddles.riddles.currentStep
    };
};

// export default RiddlesScreen;
export default connect(mapStateToProps, { riddlesFetch, setCurrentRiddle })(RiddlesScreen);