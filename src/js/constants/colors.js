const colors = {
    primary: '#786f69',
    primaryLight: '#d1c4af',
    primaryDark: '#585356',
    primaryDarker: '#504a4b',
    primaryDarkest: '#413a3b',

    secondaryLight: '#a39990',
    secondaryDark: '#585153',
    secondaryDarkest: '#363132',

    appGroup: '#948A84',
    appGroupTitle: '#8B817E'
};

colors.bg = {
    light: colors.primaryLight,
    medium: colors.secondaryLight,
    dark: colors.primaryDarkest
};

colors.head = {
    light: colors.secondaryLight,
    medium: colors.primary,
    dark: colors.primaryDarkest
}

colors.border = colors.primaryDarker;
colors.borderDarker = colors.secondaryDarkest;

export default colors;
