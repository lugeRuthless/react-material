import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Card,CardContent,CardMedia,Button,Typography} from '@material-ui/core';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchNewsList} from '../actions'

const styles = {
  card: {
    minWidth: '100%',
  },
  media: {
    height:60,
    float:'left',
    width:'33%'
  },
  title: {
    fontSize: 14,
  }
};

function SimpleCard(props) {
  const { classes } = props;
  return (
      <div>
            {props.list.map((value,index)=>{
                return (
                    <Card className={classes.card} key={index}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" style={{color:'#333'}} gutterBottom>
                            {value.title}
                            </Typography>
                            <Typography variant="h5" component="h2">
                            {value.img.map((value,index)=>{
                                 return (
                                     <CardMedia
                                     key={index}
                                     className={classes.media}
                                     image={value}
                                     title="Paella dish"
                                     />
                                 )
                             })}
                            </Typography>
                            <Typography component="p">
                                {value.author}　
                                {`评论数:${value.comment.num}`}　
                                {`发布时间:${value.time}`}
                                <Button  color="primary" component={Link} to={`/news/${value.id}`} className={classes.button}>了解更多</Button>
                            </Typography>
                        </CardContent>
                    </Card>
                )
            })}
      </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

class Simple extends Component{
    constructor(props){
        super(props)
        this.state={
            list:[],
            page:1,
        }

    }
    getListData=()=>{
        axios({
            url:`${GLOBALURL}news?_page=${this.state.page}&_limit=20&_sort=time&_order=desc`,
            method:'get'
        }).then(res=>{
            this.setState({
                list:[...this.state.list,...res.data],
                page:this.state.page+1
            })
        })
    }

    componentDidMount(){
       this.getListData();
    }

    render(){
        return (
            <SimpleCard {...this.props} {...this.state}/>
        )
    }
}
//const ContainerSimpleCard=connect(mapStateToProps,{fetchNewsList})(Simple)
export default withStyles(styles)(Simple);
