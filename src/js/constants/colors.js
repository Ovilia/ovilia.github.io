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
    lightest: colors.primaryLight,
    lighter: '#bab3ac',
    light: colors.secondaryLight,
    medium: colors.primary,
    mediumDarker: '#8e8781',
    dark: colors.primaryDarkest
};

colors.head = {
    light: colors.appGroupTitle,
    medium: colors.primary,
    dark: colors.primaryDarkest
}

colors.border = colors.primaryDarker;
colors.borderLight = colors.primary;
colors.borderDarker = colors.secondaryDarkest;

colors.palette = [
    colors.primary, colors.primaryLight, colors.primaryDark, colors.primaryDarker, colors.primaryDarkest,
    colors.secondaryLight, colors.secondaryDark, colors.secondaryDarkest
];

export default colors;
