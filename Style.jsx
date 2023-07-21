export default {
    // GENERAL
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    // HOMESCREEN
    iconProfil: {
        marginHorizontal: 20,
        fontSize: 40,
    },
    item: {
        flex: 1,
        backgroundColor: '#01C38E',
        height: 220,
        marginVertical: 11,
        marginHorizontal: 7,
        padding: 2,
        borderWidth: 2,
        borderColor: '#01C38E',
        borderRadius: 6,
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    itemImg: {
        width: '100%',
        height: '50%',
        borderRadius: 6,
    },
    avatarBlock: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        top: -35,
        left: 15,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
    },
    itemText: {
        flexDirection: 'row',
        height: '50%',
        width: '100%',
        textAlign: 'center',
        paddingVertical: 5,

    },
    itemTextUnit: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
    },
    itemTextUnitCity: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 12,
        paddingTop: 4,
        paddingBottom: 4,
    },
    itemTextUnitAddress: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10,
    },
    itemTextUnitPeople: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 13,
        paddingTop: 8,
    },
    itemInfo: {
        flex: 0.5,
        backgroundColor: 'transparent',
        borderRadius: 10,
        // width: '40%',
        height: '100%',
        margin: 5,
        padding: 5,
    },
    itemMaps: {
        flex: 0.5,
        // backgroundColor: '#00AF6D',
        borderRadius: 10,
        // width: '40%',
        height: '100%',
        // margin: 5,
        margin: 5,
        // shadowColor: '#171717',
        // shadowOffset: { width: 2, height: 4 },
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    // FORMSCREEN
    input: {
        height: 40,
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,

    },
    inputAutoComplete: {
        height: 40,
        // margin: 12,
        // borderWidth: 1,
        // padding: 5,
    },
    containerDate: {
        // flex: 1,
        flexDirection: 'row',
    },
    date: {
        // alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        // backgroundColor: 'red',
    },
    textDate: {
        // alignItems: 'center',
        // justifyContent: 'center',
        height: 40,
        margin: 12,
        fontSize: 20,
        // borderWidth: 1,
        padding: 10,
        width: '30%',
        // backgroundColor: 'red',
    },
    picker: {
        fontSize: 25,
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
    },
    containsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    inputSlider: {
        width: '30%',
    },
    slider: {
        width: '50%',
    }
}