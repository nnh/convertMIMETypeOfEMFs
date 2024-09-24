data survival;
    input time censor;
    datalines;
    5 1
    6 1
    6 0
    7 1
    9 0
    10 1
    11 0
    12 1
    15 1
;
run;

ods graphics / reset=all outputfmt=svg imagename='test1';
ods listing gpath='C:\Users\MarikoOhtsuka\Downloads';

proc lifetest data=survival stderr plot=survival;
    time time*censor(1);
    title 'Kaplan-Meier Survival Curve';
run;

ods listing close;

ods graphics / reset=all outputfmt=svg imagename='test2';
ods listing gpath='C:\Users\MarikoOhtsuka\Downloads';

proc sgplot data=sashelp.class;
    scatter x=height y=weight;
    ellipse x=height y=weight;
    title 'sgplot';
run;

ods listing close;
ods graphics / reset=all;

filename mysvg "C:\Users\MarikoOhtsuka\Downloads\test31.svg";
ods _all_ close;
ods listing;
goptions reset=all device=svgview gsfmode=replace gsfname=mysvg;

proc gplot data=survival;
    plot time*censor;
    run;
    ods listing close;
quit;
