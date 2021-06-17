sim.setSpeedLimit(1.0); // set simulation speed to real time (1x)
path = "/home/user/contiki-ng-attacks/examples/benchmarks/faya/"+sim.getTitle()+"/"+sim.getRandomSeed()+"_log.txt";// path to log file
log.writeFile(path, "");

TIMEOUT(600000); // 10 mintue simulation
timeout_function = function my_fun() {
  log.log("Script timed out.\n");
  log.testOK();
}
my_log_func = function(path,time,idx,msgx){
  log.append(path, (time / 1000000) + "\tID:" + idx + "	" + msgx + "\n");
}
// class Attack
function Attack(name,target,startTime,endTime){
    this.name = name; // name of variable used in contiki-ng core to turn on/off attack
    this.target = sim.getMoteWithID(target); // target mote in which attack variable is changed
    this.startTime = startTime*1000; // attack start time in usec  
    this.endTime = endTime*1000; // attack stop time in usec
    this.ON = false; // state of the attack ON
    this.OFF = false; // state of the attack OFF
    this.valuesList = new Array();
    this.timesList = new Array();
    this.vName = "";
    // function to access mote's memory and update its ithbyte with byteValue
    this.memAccess = function (varName,ithByte,byteValue) {
        mem = this.target.getMemory();
        exists = mem.getSymbolMap().containsKey(varName);
        if (exists) {
            sym = mem.getSymbolMap().get(varName);
            mem_seg = mem.getMemorySegment(sym.addr, sym.size);
            mem_seg[ithByte] = byteValue;
            mem.setMemorySegment(sym.addr, mem_seg);
            return true;
        }
        return false;
    }
    this.timeVarUpdate = function (time) {
        if (this.ON && time > this.startTime && time <  this.endTime) {
            for(i=0;i<this.valuesList.length;i++){
                if(1000*this.timesList[i] > time)
                    break;
                else
                   this.memAccess(this.vName,0,this.valuesList[i]); 
            }
        }
    } 
    // function to activate/deactivate an attack
    this.flipSwitch = function (time) {
        if (!this.ON && time > this.startTime) {
            this.ON = this.memAccess(this.name,0,0xff);
            if(this.ON)
                my_log_func(path,time,this.target.getID(),"[WARN: "+this.name+" ] attack has started");
        }
        this.timeVarUpdate(time);
        if (!this.OFF && time > this.endTime) {
            this.OFF = this.memAccess(this.name,0,0x00);
            if(this.OFF)
                my_log_func(path,time,this.target.getID(),"[WARN: "+this.name+" ] attack has stopped");
        }
    }
}

attacks = new Array();
// attacks.push(new Attack("SFA_on", 7, 0, 600000));
// attacks.push(new Attack("SHA_on", 7, 300000, 1200000));
// attacks.push(new Attack("SHA_on", 8, 0, 600000));
// attacks.push(new Attack("SFA_on", 8, 300000, 600000));
// attacks.push(new Attack("sha_on", 7, 0, 600000));
// attacks.push(new Attack("vna_on", 8, 300000, 600000));
// attacks.push(new Attack("dfa_on", 16, 300000, 600000));
// sya = new Attack("SYA_on", 7, 200000, 600000);
// sya.vName="fake_id";
// sya.valuesList.push(0x09); sya.timesList.push(200000);
// sya.valuesList.push(0x26); sya.timesList.push(400000);
// attacks.push(sya);

// randx = new java.util.Random(sim.getRandomSeed())
// rand_node = randx.nextInt(16);
// while(rand_node < 2 || rand_node == 7)
//       rand_node = randx.nextInt(16);

// my_log_func(path,time,-1,"rand = "+rand_node);
// attacks.push(new Attack("sfa_on", rand_node, 300000, 500000));
// main loop
while (true) {
//   for(j=0;j<attacks.length;j++)
//       attacks[j].flipSwitch(time);
  my_log_func(path,time,id,msg);
  YIELD();
}