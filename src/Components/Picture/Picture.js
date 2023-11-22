import './Picture.css';

function Picture(props) {
    const { backgroundColor, height, width, margin} = props;
    const style = {
        backgroundColor: backgroundColor || 'white',
        height: height || '400px',
        width: width || '300px',
        minHeight: height || '400px',
        minWidth: width || '300px',
        marginTop: margin || '10px',
        marginBottom: margin || '10px',
    }

    return (
      <div className="Picture" style={style}>
      </div>
    );
  }
  
  export default Picture;