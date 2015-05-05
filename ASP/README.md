# Apache Spark Performance
## ASP- the spark  cluster  workloads  running monitor 
<hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#E0E0E0,direction:145,strength:15)" width="100%" color=#E0E0E0 SIZE=4>
* Current version: 0.1
	
* Release data: TBD
	
* Contact: Li Zhihui, Grace Huang, Huang Yanqing
	
* Homepage:  https://github.com/intel-bigdata/ASP
	
* Contents:

	1. Overview
	2. Getting Started
	3. Running
	4. Example

<hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#E0E0E0,direction:145,strength:15)" width="100%" color=#E0E0E0 SIZE=4>
## Overview
Our goal is to work with the Apache Spark community to further enhance the performance of the Apache Spark. The data available on this site allows community members to closely track performance gains and losses with every week version of the Apache Spark. Ultimately, we hope that this data will result in consistent performance increases. 

<hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#E0E0E0,direction:145,strength:15)" width="100%" color=#E0E0E0 SIZE=4>
## Getting Started
1. Prerequisites

  1. Setup Hadoop
	
		Before you run any workload in the package, please verify the Hadoop framework is running correctly. Only Hadoop-YARN(Hadoop 2.x) are supported & tested. Currently, the suggested version is Hadoop 2.2.0 which is heavily tested.

  2. Setup HiBench-3.0
	
		Download/Checkout HiBench-3.0 benchmark suite from https://github.com/intel-hadoop/HiBench. 
	
  3. Setup Spark
	
		Download/Checkout spark from https://github.com/apache/spark. Use spark 1.2.x or later versions.
	
		For hadoop with yarn support:
	
			./make-distribution.sh --name spark-yarn --tgz -Phive -Pyarn -Dhadoop.version=2.2.0 -Dyarn.version=2.2.0
		
  4. Setup SparkBench
	
		Download/checkout SparkBench benchmark suite from https://github.com/intel-bigdata/Sparkbench.
	
  5. Setup Dew
	
		Download/checkout big data cloud management plateform Dew from https://github.com/Intel-bigdata/Dew.
	
			Build -- mvn install -Dhadoop-version=your_deployed_hadoop_version
			Set conf/slaves include your cluster's all nodes
			Set conf/dew.conf
			Start dew -- sbin/start-all.sh
		
		Download/checkout ASP repo from https://github.com/Intel-bigdata/ASP.
	
2. Configuration 
	1. Configure for Spark

		You only need to set SPARK_LOCAL_DIRS in Spark conf/spark-env.sh and slaves in Spark conf/slaves for your cluster.
	
	2. Configure for SparkBench

		You need to set some global environment variables in the conf/sparkbench-config.sh file located in the root dir.
	
			HADOOP_HOME            < The Hadoop installation location >
			HADOOP_CONF_DIR        < The Hadoop configuration DIR >
			HADOOP_EXAMPLES_JAR    < The path to hadoop-examples-xxx.jar >
			HADOOP_EXECUTABLE      < The path to hadoop bin>
			HDFS_MASTER			   < The address of hdfs master and port>
			HADOOP_VERSION         < set it to hadoop2 to enable MR2 >	
			SPARK_HOME             < The Spark installation location >
			SPARK_MASTER           < SPARK master >
			SPARK_CONF_DIR         < The Spark config DIR >
			SPARK_EXAMPLES_JAR     < The path to spark-examples-xxx.jar >	
			HIBENCH_HOME           < The HiBench installation location >
			HIBENCH_CONF 		   < The HiBench configuration DIR >
			HIVE_HOME			   < The Hive installation location >
			MAHOUT_HOME  		   < The Mahout installation location >
			NUTCH_HOME			   < The Nutch installation location >	
			SPARKBENCH_HOME 	   < The SparkBench installation location >
			SPARKBENCH_CONF 	   < The SparkBench configuration DIR >
			SPARKBENCH_JAR 		   < The SparkBench jar DIR >
			SPARKBENCH_REPORT 	   < The SparkBench report DIR >
			DICT_PATH              < The dict location >
			DATA_PATH              < The base HDFS path to hold HiBench data >
			YARN_HOME			   < The yarn installation location >
			YARN_NUM_EXECTORS      < num executors in yarn mode >
			YARN_EXECUTOR_CORES    < num executor  cores in yarn mode >
			YARN_EXECUTOR_MEMORY   < num of executor memory in yarn mode >
			YARN_DRIVER_MEMORY     < num of yarn driver memory in yarn mode>   
			SPARK_DRIVER_MEMORY    < num of spark driver memory in yarn mode>
	
	3. Configure for ASP

		You need to set some global environment variables below in the Dew/app.asp/asp.conf file before running asp. Also the Dew/app.asp/workload.conf file under the package folder defines the workloads to run. Each line in the list file specifies one workload. You can use # at the beginning of each line to skip the corresponding bench if necessary.
	
			branch 				   < The Spark branch installation location >
			update 				   < Git pull command >
			build 				   < Mvn or sbt build command >
			time				   < Set the auto running time in certain format >
			output                 < The workloads running output DIR >
			imagedir               < The path to put images in ASP repo download dir >
			type				   < The ASP running type release or time >
			plat				   < The the platform name of your cluster >
			giturl 				   < The git url of the ASP repo >

<hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#E0E0E0,direction:145,strength:15)" width="100%" color=#E0E0E0 SIZE=4>
## Running 
Before running, you should make sure that the asp.conf is properly configured.	

* Run time based apache spark performance
	 
		branch = /home/user/works/spark/spark 
		update = git pull origin master
		build = mvn -Pyarn -Phive -Phadoop-2.2 -Dhadoop.version=2.2.0 -DskipTests clean install    % or sbt/sbt -Pyarn -Phadoop-2.2 assembly
		time = 52 30 01 * * ?  % represents running at one o'clock thirty and fifty-two daily
		type = time
	
* Run release based spark performance monitoring 
		
		update = ls
		build = ls
		type = release
	Before running release based, make sure that you've downloaded the latest release spark version from http://spark.apache.org/downloads.html

	
* Several modes to run asp
	
		./asp   		% running asp automatically according to the set time
		./asp now		% running asp now regardless of the set time
		./asp draw		% running asp to draw graphs only, if workloads data have been generated already
		./asp report	% running asp to generate spark performance report 
	
## Example
Master host name sr439, username:zhihui

1. ASP Cluster Time Based Running 
	* Global Environment Variable:

			Hadoop DIR = /home/zhihui/works/hadoop/hadoop-2.2.0
			Spark DIR = /home/zhihui/works/time/spark/spark
			Sparkbench DIR = /home/zhihui/works/time/Sparkbench
			Spark-perf DIR = /home/zhihui/works/time/spark-perf
			Dew DIR = /home/zhihui/works/time/Dew
			ASP results DIR = /home/zhihui/works/tmp/plaf1.time
	*  Configuration for asp.conf: 

			branch = /home/zhihui/works/time/spark/spark 
			update = git pull origin master
			build = mvn -Pyarn -Phive -Phadoop-2.2 -Dhadoop.version=2.2.0 -DskipTests clean install    % or sbt/sbt -Pyarn -Phadoop-2.2 assembly
			time = 52 30 01 * * ?  	% represents running at one o'clock thirty and fifty-two daily
			type = time	
			output=/home/zhihui/works/tmp/
			imagedir=/home/zhihui/works/ASP/image/
			plat=plaf1    			% the platform you are running on
			giturl=https://user:password@github.com/Intel-bigdata/ASP.git
	* Configuration for asp.conf:

			parkbench.wordcount=/home/zhihui/works/time/Sparkbench/wordcount/scala/bin;./run.sh
			...
			sparkperf.scheduling=/home/zhihui/works/time/spark-perf/spark-perf-1-scheduling-throughput/bin;./run
			...
	* Execute command:
	
			./asp   % running asp automatically according to the set time
			
2. ASP Cluster Release Based Running 
	* Global Environment Variable:
	
			Hadoop DIR = /home/zhihui/works/hadoop/hadoop-2.2.0
			Spark DIR = /home/zhihui/works/release/spark/spark
			Sparkbench DIR = /home/zhihui/works/release/Sparkbench
			Spark-perf DIR = /home/zhihui/works/release/spark-perf
			Dew DIR: /home/zhihui/works/release/Dew	
			ASP results DIR = /home/zhihui/works/tmp/plaf1.release
	* Configuration for asp.conf:

			branch=/home/zhihui/works/release/spark/spark-1.3.0
			update=ls
			build=ls
			output=/home/zhihui/works/tmp/
			imagedir=/home/zhihui/works/ASP/image/
			type=release
			plat=plaf1	 
			giturl=https://user:password@github.com/Intel-bigdata/ASP.git
	* Configuration for workload.conf:

			parkbench.wordcount=/home/zhihui/works/release/Sparkbench/wordcount/scala/bin;./run.sh
			...
			sparkperf.scheduling=/home/zhihui/works/release/spark-perf/spark-perf-1-scheduling-throughput/bin;./run
			...
	* Execute command:
	
			./asp now		% running asp at once
